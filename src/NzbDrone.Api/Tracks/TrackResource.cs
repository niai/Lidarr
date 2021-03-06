﻿using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using NzbDrone.Api.TrackFiles;
using NzbDrone.Api.REST;
using NzbDrone.Api.Music;
using NzbDrone.Core.Music;

namespace NzbDrone.Api.Tracks
{
    public class TrackResource : RestResource
    {
        public int ArtistId { get; set; }
        public int TrackFileId { get; set; }
        public int AlbumId { get; set; }
        public bool Explicit { get; set; }
        public int TrackNumber { get; set; }
        public string Title { get; set; }
        public int Duration { get; set; }
        public TrackFileResource TrackFile { get; set; }

        public bool HasFile { get; set; }
        public bool Monitored { get; set; }
        //public string SeriesTitle { get; set; }
        public ArtistResource Artist { get; set; }
        public Ratings Ratings { get; set; }

        //Hiding this so people don't think its usable (only used to set the initial state)
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool Grabbed { get; set; }
    }

    public static class TrackResourceMapper
    {
        public static TrackResource ToResource(this Track model)
        {
            if (model == null) return null;

            return new TrackResource
            {
                Id = model.Id,

                ArtistId = model.ArtistId,
                TrackFileId = model.TrackFileId,
                AlbumId = model.AlbumId,
                Explicit = model.Explicit,
                TrackNumber = model.TrackNumber,
                Title = model.Title,
                Duration = model.Duration,
                //EpisodeFile

                HasFile = model.HasFile,
                Monitored = model.Monitored,
                Ratings = model.Ratings,
                //SeriesTitle = model.SeriesTitle,
                //Series = model.Series.MapToResource(),
            };
        }

        public static List<TrackResource> ToResource(this IEnumerable<Track> models)
        {
            if (models == null) return null;

            return models.Select(ToResource).ToList();
        }
    }
}
