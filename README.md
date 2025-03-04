```bash
npm run dev
# then head to localhost:3000 and observe that the second action never returns
```

![CleanShot 2025-03-04 at 13 09 58](https://github.com/user-attachments/assets/259af5a1-9aa5-4056-8ea0-da7ae86fc5ad)

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
