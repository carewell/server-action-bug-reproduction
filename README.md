## Minimal reproduction - server action "black hole"

If there is more than one server action running during a route transition, only the first server action returns.

For example:

```ts
'use client'

import {useRouter} from "next/navigation";
import {action} from "@/app/action";
import {useEffect, useState} from "react";

export default function Page() {
  const router = useRouter()

  const [isLoadingOne, setIsLoadingOne] = useState(true)
  const [isLoadingTwo, setIsLoadingTwo] = useState(true)


  useEffect(() => {
    // this action returns
    action().finally(() => {
      setIsLoadingOne(false)
    })

    // this action never executes
    action().finally(() => {
      setIsLoadingTwo(false)
    })

    // page transition whilst the actions are running
    setTimeout(() => {
      router.push('/?test=1')
    }, 1)
  }, [router]);



  return (
    <div className="space-y-4 p-4">
      <div>
        {isLoadingOne ? 'Executing action one...' : 'Action one has returned'}
      </div>
      <div>
        {isLoadingTwo ? 'Executing action two...' : 'Action two has returned'}
      </div>
    </div>
  );
}

```

### how to run?

```bash
npm run dev
# then head to localhost:3000 and observe that the second action never returns
```

![CleanShot 2025-03-04 at 13 32 33](https://github.com/user-attachments/assets/4eca87d9-a13c-4a2a-b8d4-4e7200dd1b30)
