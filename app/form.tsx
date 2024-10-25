"use client";
import { useActionState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import type { State } from "./types";

let initialState: State = {
  status: "name",
  formData: new FormData(),
};

export function Form({
  incrementalSendAction,
}: {
  incrementalSendAction: (
    prevState: State,
    formData: FormData,
  ) => Promise<State>;
}) {
  let [state, action] = useActionState(incrementalSendAction, initialState);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          {state.status === "complete" ? "Success!" : "Send a Note!"}
        </CardTitle>
      </CardHeader>
      {state.status === "complete" ? (
        <>
          <CardContent>
            <CardDescription>Your note has been sent.</CardDescription>
            <pre>
              {JSON.stringify(
                Object.fromEntries(state.formData.entries()),
                null,
                2,
              )}
            </pre>
          </CardContent>
        </>
      ) : (
        <form action={action}>
          <CardContent>
            <div className="space-y-4">
              {state.status === "error" && (
                <CardDescription>
                  Please fill out all the fields.
                </CardDescription>
              )}
              <div className={cn(state.status !== "name" && "hidden")}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  defaultValue={state.formData.get("name") as string}
                />
              </div>
              <div className={cn(state.status !== "email" && "hidden")}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required={state.status === "email"}
                  defaultValue={state.formData.get("email") as string}
                />
              </div>
              <div className={cn(state.status !== "note" && "hidden")}>
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Enter your note"
                  required={state.status === "note"}
                  defaultValue={state.formData.get("note") as string}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            {state.status !== "name" && (
              <Button
                variant="outline"
                type="submit"
                formNoValidate
                name="back"
                value="true"
              >
                Back
              </Button>
            )}
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
