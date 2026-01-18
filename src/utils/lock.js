let locked = false;
exports.acquire = async () => { while (locked) await new Promise(r => setTimeout(r, 10)); locked = true; };
exports.release = () => locked = false;
