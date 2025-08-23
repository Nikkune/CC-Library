export function clamp(value: number, min: number, max: number) {
	return math.min(math.max(value, min), max);
}

export function lerp(start: number, end: number, amount: number) {
	return start + (end - start) * amount;
}

export function map(value: number, start1: number, end1: number, start2: number, end2: number) {
	return lerp(start2, end2, clamp((value - start1) / (end1 - start1), 0, 1));
}