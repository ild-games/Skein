import { registerKeyDownHandler } from './keyboard-multiplexer';

describe('keyboard-multiplexer', function () {
    it('one keyDownHandler get called', function () {
        let called = false;
        registerKeyDownHandler((event) => {
            called = true;
        });

        document.onkeydown(document.createEvent('KeyboardEvent'));
        expect(called).toEqual(true);
    });

    it('multiple keyDownHandlers get called', function () {
        let firstCalled = false;
        let secondCalled = false;
        registerKeyDownHandler((event) => {
            firstCalled = true;
        });
        registerKeyDownHandler((event) => {
            secondCalled = true;
        });

        document.onkeydown(document.createEvent('KeyboardEvent'));
        expect(firstCalled).toEqual(true);
        expect(secondCalled).toEqual(true);
    });
});
