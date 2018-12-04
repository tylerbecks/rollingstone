import React from 'react'
import { Card } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'
import AlbumCard from './AlbumCard'

const AlbumsContainer = ({ albums, bookmarkedId, classes }) => (
  <Card.Group centered stackable>
    {albums.map(
      ({
        node: {
          album,
          band,
          description,
          id,
          imageHref,
          rank,
          recordLabel,
          year,
        },
      }) => (
        <AlbumCard
          bookmarked={Number(bookmarkedId) === rank}
          description={description}
          header={rank}
          href={getSpotifyHref(band, album)}
          id={rank}
          imageHref={imageHref}
          key={id}
          meta={`${year}, ${recordLabel}`}
          onClickActionButton={() => handleClickSpotifyButton(band, album)}
          subHeader={
            <span>
              {band}, <em>{album}</em>
            </span>
          }
        />
      )
    )}
  </Card.Group>
)

const getSpotifyHref = (band, album) =>
  `https://open.spotify.com/search/results/artist:${band} album:${album}`

const getSpotifySearchStr = (band, album) => `artist:"${band}" album:"${album}"`

const handleClickSpotifyButton = (band, album) => {
  const spotifySearchStr = getSpotifySearchStr(band, album)
  copy(spotifySearchStr)
}

export default AlbumsContainer
