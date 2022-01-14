import { FaFacebook, FaGithub } from "react-icons/fa";
import classes from "./MainFooter.module.css";

function MainFooter() {
  return (
    <footer className={classes["main-footer"]}>
      <div className={classes["content-container"]}>
        <p className={classes["p-title"]}>ABOUT THIS WEBSITE</p>
        <p className={classes["p-content"]}>
          The my-shop is an online shopping websites portfolio for applying for
          work, The my-shop developed with React, Node.js(express) and has many
          features such as CRUD, Authentication, Cart, Filter Product,
          Responsive Design, I hope you will like it, Thank you.
        </p>
      </div>
      <div className={classes["content-container"]}>
        <p className={classes["p-title"]}>MY PORTFOLIO</p>
        <a
          href="https://sneakers-rbb.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className={classes["a-link-portfolio"]}
        >
          sneakers-rbb (html,css,scss)
        </a>
        <a
          href="https://faster-m.netlify.app"
          target="_blank"
          rel="noreferrer"
          className={classes["a-link-portfolio"]}
        >
          faster-m (html,css,scss)
        </a>
        <a
          href="https://hotel-lo.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className={classes["a-link-portfolio"]}
        >
          hotel-lo (html,css,scss)
        </a>
        <a
          href="https://xd.adobe.com/view/341c0292-0c01-4dcd-b884-804ca74f6bfa-614f/"
          target="_blank"
          rel="noreferrer"
          className={classes["a-link-portfolio"]}
        >
          mind-box (UX/UI design)
        </a>
      </div>
      <div className={classes["content-container"]}>
        <p className={classes["p-title"]}>CONTACT ME</p>
        <div className={classes["content-contact"]}>
          <p className={classes["p-content"]}>
            Tel : 091 881 5596 <br />
            Email : monton.onnom1@gmail.com <br />
            Line ID : jamemonton1997
          </p>
        </div>
        <div className={classes["icon-container"]}>
          <a
            href="https://www.facebook.com/jame.monton/"
            target="_blank"
            rel="noreferrer"
            className={classes["a-link"]}
          >
            <FaFacebook
              style={{
                fontSize: "2.5rem",
              }}
            />
          </a>
          <a
            href="https://github.com/alias-th"
            target="_blank"
            rel="noreferrer"
            className={classes["a-link"]}
          >
            <FaGithub
              style={{
                fontSize: "2.5rem",
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
