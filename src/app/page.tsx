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

    // if you remove this, both will return
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
