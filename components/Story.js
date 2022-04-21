export default function Story({ img, username }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full border-2 border-red-400
         object-contain p-[1.5px]
         transition-transform duration-200 ease-out hover:scale-110
         "
        src={img}
        alt=""
      />
      <p className="text-x5 w-14 truncate text-center">{username}</p>
    </div>
  )
}
