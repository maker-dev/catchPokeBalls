var scorePoint = 0;
function score(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 25px Arial";
    ctx.textAlign = "start"
    ctx.fillText(`SCORE:${scorePoint}`,0,20);
}

