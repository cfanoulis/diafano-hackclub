// import Image from "next/image.js";
import type { BankOrg } from "../hackbank";
import styles from "../styles/cards.module.css";
export const ProjectCard = ({ data }: { data: BankOrg }) => {
  return (
    <>
      <a
        href={`https://bank.hackclub.com/${data.slug}`}
        className={`card interactive ${styles.card}`}
        key={data.id}
      >
        {data.logo && (
          <img
            alt={`${data.name}'s logo`}
            src={data.logo}
            style={{ marginRight: "8px" }}
            height={32}
            // width={32}
          ></img>
        )}
        <span>
          <strong>{data.name}</strong>
        </span>
      </a>
    </>
  );
};
