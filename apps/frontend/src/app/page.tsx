import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return <div>home page - inlucde dummey showcase
    <br />
    <Link className="text-blue-500 underline" href="/dashboard">Dashboard</Link>
  </div>;
}
