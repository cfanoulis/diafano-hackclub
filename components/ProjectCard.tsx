// import Image from "next/image.js";
import Image from "next/image.js";
import type { BankOrg } from "../hackbank";
import styles from "../styles/cards.module.css";
export const ProjectCard = ({ data }: { data: BankOrg }) => {
  return (
    <>
      <a
        href={`https://hcb.hackclub.com/${data.slug}`}
        className={`card interactive lead ${styles.card}`}
        key={data.id}
      >
        {data.logo && (
          <Image
            alt={`${data.name}'s logo`}
            src={data.logo}
            style={{ marginRight: "8px" }}
            height={32}
          ></Image>
        )}
        <span>{data.name}</span>
      </a>
    </>
  );
};
