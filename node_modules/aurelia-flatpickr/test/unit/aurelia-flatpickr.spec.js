/**
 * Created by istrauss on 2/24/2017.
 */

import {AureliaFlatpickrCustomElement} from '../../src/aurelia-flatpickr';

describe('the aurelia-flatpickr custom element', () => {
    const aureliaFlatpickr = new AureliaFlatpickrCustomElement();

    describe('_datesAreSynced() method', () => {

        // An falsy model is the same as an empty flatpickr.selected dates array.
        it('should return true for null, []', () => {
            const result = aureliaFlatpickr._datesAreSynced(null, []);
            expect(result).toEqual(true);
        });

        // An falsy model is the same as an empty flatpickr.selected dates array.
        it('should return true for someDate, [someDate]', () => {
            const dateA = new Date(2016, 2, 24);
            const dateB = new Date(2016, 2, 24);
            const result = aureliaFlatpickr._datesAreSynced(dateA, [dateB]);
            expect(result).toEqual(true);
        });

        // An falsy model is the same as an empty flatpickr.selected dates array.
        it('should return true for [anotherDate, someDate], [someDate, anotherDate]', () => {
            const dateA = new Date(2016, 2, 23);
            const dateB = new Date(2016, 2, 24);
            const dateC = new Date(2016, 2, 23);
            const dateD = new Date(2016, 2, 24);

            const result = aureliaFlatpickr._datesAreSynced([dateB, dateA], [dateC, dateD]);
            expect(result).toEqual(true);
        });

        // An falsy model is the same as an empty flatpickr.selected dates array.
        it('should return false for someDate, [someDate, anotherDate]', () => {
            const dateA = new Date(2016, 2, 23);
            const dateB = new Date(2016, 2, 23);
            const dateC = new Date(2016, 2, 24);

            const result = aureliaFlatpickr._datesAreSynced(dateA, [dateB, dateC]);
            expect(result).toEqual(false);
        });

        // An falsy model is the same as an empty flatpickr.selected dates array.
        it('should return false for [someDate, anotherDate], [anotherDate]', () => {
            const dateA = new Date(2016, 2, 23);
            const dateB = new Date(2016, 2, 24);
            const dateC = new Date(2016, 2, 24);

            const result = aureliaFlatpickr._datesAreSynced([dateA, dateB], [dateC]);
            expect(result).toEqual(false);
        });
    });
});
