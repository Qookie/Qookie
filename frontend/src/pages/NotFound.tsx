import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div>404 NOT FOUND / CHECK YOUR LOGIN STATUS</div>
			<Link to='/home'>to home</Link>
    </>
  );
}
