export class BullPgia {
    static calculateBullsAndPgias(secretCode: number[], guess: number[]): { bulls: number, pgias: number } {
        let bulls = 0;
        let pgias = 0;
        const secretCodeCopy: (number | null)[] = [...secretCode]; 
        const guessCopy: (number | null)[] = [...guess];

        // חישוב Bulls
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === secretCode[i]) {
                bulls++;
                secretCodeCopy[i] = null;  // מסמן שנחזה
                guessCopy[i] = null;       // מסמן שנחזה
            }
        }

        // חישוב Pgias
        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] !== null) {
                const index = secretCodeCopy.indexOf(guessCopy[i]);
                if (index !== -1) {
                    pgias++;
                    secretCodeCopy[index] = null;  // מסמן שנחזה
                }
            }
        }

        return { bulls, pgias };
    }
}