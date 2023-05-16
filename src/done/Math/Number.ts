// type NumberArgType = string | number | BaseNumber;

// function myNumber(value: NumberArgType): BaseNumber {
//   if (value instanceof BaseNumber) {
//     return value;
//   }
//   value = String(value);
//   if (value.includes("/")) {
//     return new Fraction(value);
//   } else if (value.includes(".")) {
//     return new Float(value);
//   } else {
//     return new Integer(value);
//   }
// }

// abstract class BaseNumber {
//   value: string;

//   constructor(value: string | number | BaseNumber) {
//     if (typeof value === "number") {
//       this.value = String(value);
//     } else if (typeof value === "string") {
//       this.value = value;
//     } else {
//       this.value = value.value;
//     }
//   }

//   plus(number: NumberArgType): BaseNumber {
//     const b = myNumber(number);

//     if (this instanceof Fraction || b instanceof Fraction) {
//       return new Fraction(this).plus(b);
//     } else if (this instanceof Float || b instanceof Float) {
//       return new Float(this.valueOf() + b.valueOf());
//     }
//     return new Integer(this.valueOf() + b.valueOf());
//   }

//   abstract multipliedBy(number: NumberArgType): BaseNumber;
//   abstract dividedBy(number: NumberArgType): BaseNumber;
//   abstract minus(number: NumberArgType): BaseNumber;

//   valueOf(): number {
//     return parseFloat(this.value);
//   }

//   toString(): string {
//     return this.value;
//   }

//   abstract toFraction(): Fraction;
//   abstract toInteger(): Integer;
//   abstract toFloat(): Float;

//   equalTo(number: NumberArgType): boolean {
//     const c = myNumber(number);

//     if (c instanceof Fraction || this instanceof Fraction) {
//       return new Fraction(this).equalTo(c);
//     } else {
//       return c.value === this.value;
//     }
//   }

//   isPositive(): boolean {
//     return true;
//   }

//   isNegative(): boolean {
//     return !this.isPositive();
//   }

//   isLessThen(number: NumberArgType): boolean {
//     number = new Fraction(number);
//     return this.toFraction().minus(number).isPositive();
//   }

//   isBiggerThen(number: NumberArgType): boolean {
//     number = new Fraction(number);
//     return this.toFraction().minus(number).isNegative();
//   }
// }

// class Integer extends BaseNumber {
//   valueOf(): number {
//     return parseInt(this.value);
//   }

//   toFraction(): Fraction {
//     return new Fraction(`${this.value}/1`);
//   }

//   toInteger(): Integer {
//     return this;
//   }

//   toFloat(): Float {
//     return new Float(this.value + ".0");
//   }
// }

// class Float extends BaseNumber {
//   valueOf(): number {
//     return parseFloat(this.value);
//   }

//   toFraction() {
//     const n = this.value.split(".")[1]?.length || 0;
//     return new Fraction(
//       `${this.value.replace(".", "")}/${10 ** n}`
//     ).reduction();
//   }

//   toInteger(): Integer {
//     return new Integer(this.value.split(".")[0]);
//   }

//   toFloat(): Float {
//     return this;
//   }
// }

// class Fraction extends BaseNumber {
//   private numerator: Integer;
//   private denominator: Integer;

//   constructor(value: NumberArgType) {
//     if (value instanceof Float) {
//       value = value.toFraction();
//     }
//     super(value);
//     if (value instanceof Fraction) {
//       this.numerator = value.numerator;
//       this.denominator = value.denominator;
//     } else {
//       const splits = this.value.split("/");
//       this.numerator = new Integer(parseFloat(splits[0]));
//       this.denominator = new Integer(splits[1] ? parseFloat(splits[1]) : 1);
//     }
//   }

//   valueOf(): number {
//     return this.numerator.valueOf() / this.denominator.valueOf();
//   }

//   plus(number: NumberArgType) {
//     const b = myNumber(number).toFraction();
//     return new Fraction(
//       `${this.numerator
//         .multipliedBy(b.denominator)
//         .plus(
//           b.numerator.multipliedBy(this.denominator)
//         )}/${this.denominator.multipliedBy(b.denominator)}`
//     ).reduction();
//   }

//   reduction(): Fraction {
//     let { numerator, denominator } = this;
//     const min = Math.min(numerator, denominator);
//     for (let i = 0; i < min; i++) {
//       if (numerator % i === 0 && denominator % i === 0) {
//         numerator = numerator.dividedBy(i);
//         denominator = denominator.dividedBy(i);
//       }
//     }
//     return new Fraction(`${numerator}/${denominator}`);
//   }

//   equalTo(number: NumberArgType) {
//     const a = this.reduction();
//     const b = myNumber(number).toFraction().reduction();
//     return a.denominator === b.denominator && a.numerator === b.numerator;
//   }

//   toFraction() {
//     return this;
//   }

//   toInteger(): Integer {
//     return this.toFloat().toInteger();
//   }

//   toFloat(): Float {
//     return new Float(this.numerator.dividedBy(this.denominator));
//   }
// }

// export default { myNumber, Integer };

// import { strict as assert } from "assert";

// const a = new Integer(1);
// const b = new Float("2.2");
// const c = new Fraction("1/3");
// assert.equal(a.plus(a).value, "2");
// assert.equal(a.plus(a) instanceof Integer, true);
// assert.equal(a.plus(b).value, "3.2");
// assert.equal(b.plus(a).value, "3.2");
// assert.equal(a.plus(c).value, "4/3");
// assert.equal(c.plus(a).value, "4/3");
// assert.equal(b.toFraction().value, "11/5");
// assert.equal(b.plus(c).value, "38/15");
// assert.equal(c.plus(b).value, "38/15");
// assert.equal(b.equalTo("11/5"), true);
// assert.equal(new Fraction("11/5").equalTo(b), true);
// assert.equal(c.plus(c).value, "2/3");
