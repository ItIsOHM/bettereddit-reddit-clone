"use client";

import { Button } from "@/components/ui/ui/Button";
import { Input } from "@/components/ui/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const {loginToast} = useCustomToast(); 

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if(err instanceof AxiosError) {
        if(err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists!',
            description: 'Please choose a different subreddit name.',
            variant: 'destructive',
          })
        }
        
        if(err.response?.status === 422) {
          return toast({
            title: 'Subreddit validation failed.',
            description: 'Please choose the subreddit name length between 3-21 characters.',
            variant: 'destructive',
          })
        }

        if(err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create the subreddit.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
    }
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-secondary w-full h-fit p-4 rounded-lg space-y-6 border border-primary">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="h-1 bg-muted-foreground"/>

        <div>
          <p className="text-lg font-medium">Name:</p>
          <p>Community names including capitalization cannot be changed.</p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6 mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={()=> createCommunity()}
            variant={"outline"}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
