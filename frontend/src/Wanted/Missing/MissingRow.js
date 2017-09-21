import PropTypes from 'prop-types';
import React from 'react';
import episodeEntities from 'Episode/episodeEntities';
import EpisodeTitleLink from 'Episode/EpisodeTitleLink';
import EpisodeStatusConnector from 'Episode/EpisodeStatusConnector';
import SeasonEpisodeNumber from 'Episode/SeasonEpisodeNumber';
import EpisodeSearchCellConnector from 'Episode/EpisodeSearchCellConnector';
import ArtistNameLink from 'Artist/ArtistNameLink';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import styles from './MissingRow.css';

function MissingRow(props) {
  const {
    id,
    // episodeFileId,
    artist,
    // seasonNumber,
    // episodeNumber,
    // absoluteEpisodeNumber,
    // sceneSeasonNumber,
    // sceneEpisodeNumber,
    // sceneAbsoluteEpisodeNumber,
    releaseDate,
    title,
    isSelected,
    columns,
    onSelectedChange
  } = props;

  return (
    <TableRow>
      <TableSelectCell
        id={id}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
      />

      {
        columns.map((column) => {
          const {
            name,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'artist.sortName') {
            return (
              <TableRowCell key={name}>
                <ArtistNameLink
                  nameSlug={artist.nameSlug}
                  artistName={artist.artistName}
                />
              </TableRowCell>
            );
          }

          // if (name === 'episode') {
          //   return (
          //     <TableRowCell
          //       key={name}
          //       className={styles.episode}
          //     >
          //       <SeasonEpisodeNumber
          //         seasonNumber={seasonNumber}
          //         episodeNumber={episodeNumber}
          //         absoluteEpisodeNumber={absoluteEpisodeNumber}
          //         seriesType={series.seriesType}
          //         sceneSeasonNumber={sceneSeasonNumber}
          //         sceneEpisodeNumber={sceneEpisodeNumber}
          //         sceneAbsoluteEpisodeNumber={sceneAbsoluteEpisodeNumber}
          //       />
          //     </TableRowCell>
          //   );
          // }

          if (name === 'albumTitle') {
            return (
              <TableRowCell key={name}>
                <EpisodeTitleLink
                  episodeId={id}
                  artistId={artist.id}
                  episodeEntity={episodeEntities.WANTED_MISSING}
                  episodeTitle={title}
                  showOpenArtistButton={true}
                />
              </TableRowCell>
            );
          }

          if (name === 'releaseDate') {
            return (
              <RelativeDateCellConnector
                key={name}
                date={releaseDate}
              />
            );
          }

          // if (name === 'status') {
          //   return (
          //     <TableRowCell
          //       key={name}
          //       className={styles.status}
          //     >
          //       <EpisodeStatusConnector
          //         episodeId={id}
          //         episodeFileId={episodeFileId}
          //         episodeEntity={episodeEntities.WANTED_MISSING}
          //       />
          //     </TableRowCell>
          //   );
          // }

          if (name === 'actions') {
            return (
              <EpisodeSearchCellConnector
                key={name}
                episodeId={id}
                artistId={artist.id}
                episodeTitle={title}
                episodeEntity={episodeEntities.WANTED_MISSING}
                showOpenArtistButton={true}
              />
            );
          }
        })
      }
    </TableRow>
  );
}

MissingRow.propTypes = {
  id: PropTypes.number.isRequired,
  // episodeFileId: PropTypes.number,
  artist: PropTypes.object.isRequired,
  // seasonNumber: PropTypes.number.isRequired,
  // episodeNumber: PropTypes.number.isRequired,
  // absoluteEpisodeNumber: PropTypes.number,
  // sceneSeasonNumber: PropTypes.number,
  // sceneEpisodeNumber: PropTypes.number,
  // sceneAbsoluteEpisodeNumber: PropTypes.number,
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired
};

export default MissingRow;