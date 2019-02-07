import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export const createObserver = <T>(target: Observable<T>, initial: T) => () => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const sub = target.subscribe({
      next: v => setValue(v)
    });

    return () => sub.unsubscribe();
  }, []);

  return value;
};
