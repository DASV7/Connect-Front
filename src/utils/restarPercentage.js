module.exports = function restarPorcentaje(time, intervalo) {
    let porcentaje = 100;
    const duracion = time;
    const intervalo = intervalo;
    const paso = (porcentaje / duracion) * intervalo;

    const temporizador = setInterval(() => {
        porcentaje -= paso;
        porcentaje = Math.max(porcentaje, 0).toFixed(2);
        if (porcentaje <= 0) {
            clearInterval(temporizador);
            console.log('¡Resta completada!');
        }
    }, intervalo);
}

