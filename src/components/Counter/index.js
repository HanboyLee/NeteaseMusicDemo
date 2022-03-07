import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementAsync } from "../../app/features/counter/counterSlice";

export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
                <button aria-label="Decrement value" onClick={() => dispatch(incrementAsync(2))}>
                    async increment +2
                </button>
            </div>
        </div>
    );
}
