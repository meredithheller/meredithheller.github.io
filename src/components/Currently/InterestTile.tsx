import React from "react";

type InterestTileProps = {
    tileType: string,
    title: string,
    url: string,
    img: string,
}

function InterestTile(props: InterestTileProps) {
    return (
      <div>
        <p>{props.tileType}</p>
        <p>{props.title}</p>
      </div>
    )
}

export default InterestTile;