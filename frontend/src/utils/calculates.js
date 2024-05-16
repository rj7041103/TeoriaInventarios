class EOQCalculator {
    constructor({ D, Cp, Cf, Cmi }) {
        this.D = D;
        this.Cp = Cp;
        this.Cf = Cf;
        this.Cmi = Cmi;
    }

    calcularCantidadOptima() {
        return Math.sqrt((2 * this.D * this.Cp * (this.Cf + this.Cmi)) / (this.Cf * this.Cmi)).toFixed(4);
    }

    calcularFaltanteOptimo() {
        return Math.sqrt((2 * this.D * this.Cp * this.Cmi) / ((this.Cf + this.Cmi) * this.Cf)).toFixed(4);
    }
}

export function calculateQ({ D, Cp, Cf, Cmi }) {
    const calculator = new EOQCalculator({ D, Cp, Cf, Cmi });
    return calculator.calcularCantidadOptima();
}

export function calculateS({ D, Cp, Cf, Cmi }) {
    const calculator = new EOQCalculator({ D, Cp, Cf, Cmi });
    return calculator.calcularFaltanteOptimo();
}
