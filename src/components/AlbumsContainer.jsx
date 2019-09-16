import React from 'react'
import copy from 'copy-to-clipboard'
import { Card } from 'semantic-ui-react'
import AlbumCard from './AlbumCard'

const AlbumsContainer = ({
  albums,
  bookmarkedId,
  currentAlbumIndex,
  onBookmark,
}) => {
  const albumNode = albums[currentAlbumIndex]

  if (!albumNode) return null

  const {
    album,
    band,
    description,
    id,
    imageHref,
    rank,
    recordLabel,
    year,
  } = albumNode.node

  return (
    <Card.Group centered>
      <AlbumCard
        onBookmark={onBookmark}
        bookmarked={bookmarkedId === rank}
        description={description}
        header={rank}
        href={getSpotifyHref(band, album)}
        id={rank}
        imageHref={imageHref}
        meta={`${year}, ${recordLabel}`}
        onClickActionButton={() => handleClickSpotifyButton(band, album)}
        subHeader={
          <span>
            {band}, <em>{album}</em>
          </span>
        }
      />
    </Card.Group>
  )
}

const getSpotifyHref = (band, album) =>
  `https://open.spotify.com/search/results/artist:${band} album:${album}`

const getSpotifySearchStr = (band, album) => `artist:"${band}" album:"${album}"`

const handleClickSpotifyButton = (band, album) => {
  const spotifySearchStr = getSpotifySearchStr(band, album)
  copy(spotifySearchStr)
}

export default AlbumsContainer
