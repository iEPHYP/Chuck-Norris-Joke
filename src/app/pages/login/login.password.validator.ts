import { AbstractControl } from '@angular/forms';

export const passwordValidator = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const value = control.value;
  return !isValid(value) ? { password: { value } } : null;
};

const aCode = 97;
const zCode = 122;
const iCode = 105;
const lCode = 108;

function isValid(password: string) {
  if (password.length > 32) {
    return false;
  }

  let sequenceFound = false;
  /**
   * key is the letter of pair.
   * value is boolean that indicates uniqueness
   * */
  const pairsUniqueness: { [key: string]: boolean } = {};
  for (let i = 0; i < password.length; i++) {
    const letter = password.charAt(i);
    const letterCode = password.charCodeAt(i);

    if (
      letterCode < aCode ||
      letterCode > zCode ||
      letterCode === iCode ||
      letterCode === lCode
    ) {
      return false;
    }

    if (!sequenceFound && isSequence(password.substr(i, 3))) {
      sequenceFound = true;
    }

    const pair = password.substr(i, 2);
    if (pair === letter + letter) {
      const isUnique = pairsUniqueness[letter];
      if (typeof isUnique === 'undefined') {
        pairsUniqueness[letter] = true;
      } else if (isUnique) {
        pairsUniqueness[letter] = false;
      }
    }
  }

  let uniquePairsCount = 0;
  for (const letter in pairsUniqueness) {
    if (pairsUniqueness.hasOwnProperty(letter)) {
      const isUnique = pairsUniqueness[letter];
      isUnique && uniquePairsCount++;
      if (uniquePairsCount === 2) {
        break;
      }
    }
  }

  return sequenceFound && uniquePairsCount >= 2;
}

function isSequence(sequence: string): boolean {
  if (sequence.length !== 3) {
    return false;
  }

  for (let i = 0; i <= 1; i++) {
    if (sequence.charCodeAt(i) - sequence.charCodeAt(i + 1) !== -1) {
      return false;
    }
  }

  return true;
}
