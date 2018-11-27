import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

export const createSubscribedState = <T>(target: BehaviorSubject<T>) => () => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const sub = target.subscribe({
      next: () => {
        setRender(!render);
      }
    });

    return () => sub.unsubscribe;
  }, []);

  return target.value;
};
