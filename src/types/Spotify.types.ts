export interface CurrentlyPlaying {
  item?: {
    name: string;
    artists: [{ name: string }];
    album: {
      images: [{ url: string }];
    };
  };
}
