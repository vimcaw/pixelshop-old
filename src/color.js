String.prototype.forEach = NodeList.prototype.forEach;

export default {
    HSV2RGB(a) {
		let h = +a[0] / 360,
			s = +a[1] / 100,
			v = +a[2] / 100,
			r, g, b, i, f, p, q, t;
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		i = i || 0;
		q = q || 0;
		t = t || 0;
		switch (i % 6) {
			case 0:
				r = v, g = t, b = p;
				break;
			case 1:
				r = q, g = v, b = p;
				break;
			case 2:
				r = p, g = v, b = t;
				break;
			case 3:
				r = p, g = q, b = v;
				break;
			case 4:
				r = t, g = p, b = v;
				break;
			case 5:
				r = v, g = p, b = q;
				break;
		}
		let round = Math.round;
		return [round(r * 255), round(g * 255), round(b * 255)];
	},
    HSV2HEX(a) {
        return this.RGB2HEX(this.HSV2RGB(a));
    },
    RGB2HSV(a) {
        let r = +a[0],
            g = +a[1],
            b = +a[2],
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            h, s = (max === 0 ? 0 : d / max),
            v = max / 255;
        switch (max) {
            case min:
                h = 0;
                break;
            case r:
                h = (g - b) + d * (g < b ? 6 : 0);
                h /= 6 * d;
                break;
            case g:
                h = (b - r) + d * 2;
                h /= 6 * d;
                break;
            case b:
                h = (r - g) + d * 4;
                h /= 6 * d;
                break;
        }
        return [h * 360, s * 100, v * 100];
    },
    RGB2HEX(a) {
		let s = +a[2] | (+a[1] << 8) | (+a[0] << 16);
		s = '000000' + s.toString(16);
		return s.slice(-6);
	},

    HEX2RGB(s) {
        if (s.length === 3) {
            s = s.replace(/./g, '$&$&');
        }
        return [parseInt(s[0] + s[1], 16), parseInt(s[2] + s[3], 16), parseInt(s[4] + s[5], 16)];
    },
    HEX2HSV(s) {
        return this.RGB2HSV(this.HEX2RGB(s));
    },

    getComplementaryColor (hexColor) {
        let color = this.HEX2RGB(hexColor),
            complementaryColor = [];

        color.forEach(function (item, index) {
            complementaryColor[index] = 255 - item;
        });

        return this.RGB2HEX(complementaryColor);
    },
    getGrayScale (hexColor) {
        let color = this.HEX2RGB(hexColor);
        return (color[0]*38 + color[1]*75 + color[2]*15) >> 7;
    },
    getGrayScaleColor(grayScale) {
        return this.RGB2HEX([grayScale, grayScale, grayScale]);
    },
    getComplementaryGrayColor(hexColor) {
        return this.getComplementaryColor(this.getGrayScaleColor(this.getGrayScale(hexColor)));
    }
};