function deadTimer(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "end";
    ctx.fillText(`TIMER:${5-timeCounter}`,width,20);
}