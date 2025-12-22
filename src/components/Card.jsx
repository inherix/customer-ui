export default function Card({ title = "application", subtitle = "dash" }) {
  return (
    <div className=" border border-black rounded-xl p-4  hover:shadow-lg hover:shadow-indigo-500/40">
      <div className="border-b mb-2">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <h1 className="text-sm  font-semibold">{subtitle}</h1>
    </div>
  );
}
