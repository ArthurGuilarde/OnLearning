import Link from "next/link";
import {
  faCalendarCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyLinks() {
  return (
    <div id="background">
      <div id="avatarContainer">
        <img
          id="avatar"
          src="/assets/ceo.jpeg"
          className="img-fluid"
          alt="Responsive image"
        />
      </div>
      <div id="linksContainer">
        <Link href="https://gofurther.simplybook.me/v2/">
          <div id="card">
            <FontAwesomeIcon icon={faCalendarCheck} />
            <h4>Agende sua aula</h4>
          </div>
        </Link>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLScYwNoBJqDfKwuekQM1YvtbwMbTY0POEJKZKn3H1zF_f6VuIw/viewform">
          <div id="card">
            <FontAwesomeIcon icon={faCheckDouble} />
            <h4>Assessoria visto EUA</h4>
          </div>
        </Link>
        <Link href="https://www.instagram.com/caioleitecl/">
          <div id="card">
            <FontAwesomeIcon icon={faInstagram} />
            <h4>Instagram oficial</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
