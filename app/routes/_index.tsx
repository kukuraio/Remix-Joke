import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
   <div>
    <h1 className="text-2xl text-red-300">
      Hello remix.
      </h1>
    </div>
  );
}
