import prisma from '../config/prisma.js';

export async function procesarPedido(data) {
    return await prisma.$transaction(async (tx) => {
        
        const nuevoPedido = await tx.pedido.create({
            data: {
                mesa: data.mesa || "Barra",
                tipo_pedido: data.tipo_pedido || "Local",
                status: "pendiente",
                status_pago: data.status_pago || "Pendiente",
                caja: {
                    connect: { id: Number(data.cajaId) }
                },
                cliente: {
                    connectOrCreate: {
                        where: { cedula: String(data.cedula) },
                        create: {
                            cedula: String(data.cedula),
                            nombre: data.nombre_cliente || "Cliente General",
                            telefono: data.telefono || "0000"
                        }
                    }
                }
            }
        });

        const listaProductos = data.productos || data.platillo || [];

        if (listaProductos.length === 0) {
            throw new Error("El pedido debe contener al menos un producto.");
        }

        const detallesPromises = listaProductos.map(p => {
            return tx.detallePedido.create({
                data: {
                    nombre_platillo: p.nombre_platillo,
                    precio: Number(p.precio),
                    status: 'Preparacion',
                    platillo: {
                        connect: { id: Number(p.id) }
                    },
                    cocina: {
                        connect: { id: Number(data.cocinaId) }
                    },
                    pedido: {
                        connect: { id: nuevoPedido.id }
                    }
                }
            });
        });

        await Promise.all(detallesPromises);


        if (data.pago) {
            await tx.pago.create({
                data: {
                    monto: Number(data.pago.monto),
                    metodo_pago: data.pago.metodo || "Efectivo",
                    referencia: String(data.pago.referencia || "S/N"),
                    pedido: {
                        connect: { id: nuevoPedido.id }
                    }
                }
            });
        }

        return nuevoPedido;
    });
}

export async function confirmarPedidoEnCaja(pedidoId) {
    return await prisma.$transaction(async (tx) => {
        // 1. El pedido ya es oficial
        await tx.pedido.update({
            where: { id: Number(pedidoId) },
            data: { status: 'CONFIRMADO', status_pago: 'PAGADO' }
        });

        // 2. CAMBIO DE ESTADO: Los platos pasan a 'EN_PREPARACION'
        return await tx.detallePedido.updateMany({
            where: { 
                pedidoId: Number(pedidoId),
                status: 'ESPERANDO_CAJA' 
            },
            data: { status: 'EN_PREPARACION' } // 👈 Ahora el monitor de cocina los muestra
        });
    });
}

// backend/src/services/pedidoService.js

export async function consultarPedidosPorCaja(cajaId) {
    return await prisma.pedido.findMany({
        where: {
            cajaId: Number(cajaId),
            // Opcional: Si solo quieres los que faltan por pagar
            // status_pago: "Pendiente" 
        },
        include: {
            cliente: true,
            detalles: true,
            pago: true
        },
        orderBy: {
            id: 'desc'
        }
    });
}


// backend/src/services/pedidoService.js

export async function consultarPedidosCocina(cocinaId) {
    return await prisma.detallePedido.findMany({
        where: {
            cocinaId: Number(cocinaId),
            status: {
                in: ['Preparacion', 'Pendiente'] // Trae lo que falta por cocinar
            }
        },
        include: {
            pedido: {
                select: {
                    mesa: true,
                    tipo_pedido: true,
                    id: true // ID del pedido padre
                }
            }
        },
        orderBy: {
            pedidoId: 'asc' // Agrupa por pedido
        }
    });
}