import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createArtistSelector from 'Store/Selectors/createArtistSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import EpisodeSearchCell from './EpisodeSearchCell';

function createMapStateToProps() {
  return createSelector(
    (state, { episodeId }) => episodeId,
    (state, { sceneSeasonNumber }) => sceneSeasonNumber,
    createArtistSelector(),
    createCommandsSelector(),
    (episodeId, sceneSeasonNumber, series, commands) => {
      const isSearching = _.some(commands, (command) => {
        const episodeSearch = command.name === commandNames.EPISODE_SEARCH;

        if (!episodeSearch) {
          return false;
        }

        return command.body.albumIds.indexOf(episodeId) > -1;
      });

      return {
        artistMonitored: series.monitored,
        seriesType: series.seriesType,
        isSearching
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onSearchPress(name, path) {
      dispatch(executeCommand({
        name: commandNames.EPISODE_SEARCH,
        albumIds: [props.episodeId]
      }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(EpisodeSearchCell);