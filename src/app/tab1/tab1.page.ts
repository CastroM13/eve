import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  songPlaying = null;
  songs = null;
  paused = true;
  opened = false;

  constructor(public http: HttpClient, public modalController: ModalController) { }

  ngOnInit() {
    this.http.get("https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=25&q=tyler%20the%20creator&key=AIzaSyCsTT02T4hAzyMDJpb911BdT3try14p2Tw")
    .subscribe((response: any) => {
      this.songs = response.items;
    });
  }

  searchSong(event) {
    const text = encodeURI(event.target.value);
    this.http.get(`https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=25&q=${text}&key=AIzaSyCsTT02T4hAzyMDJpb911BdT3try14p2Tw`)
    .subscribe((response: any) => {
      this.songs = response.items;
    });
  }

  selectSong(song) {  
    // faça algo aqui
    this.http.get("https://www.googleapis.com/youtube/v3/videos?id="+song.id.videoId+"&part=contentDetails&key=AIzaSyCsTT02T4hAzyMDJpb911BdT3try14p2Tw")
    .subscribe((response: any) => {
      song = {...song, ...response.items[0]}
      console.log('song', song);
      this.songPlaying = song;
      this.paused = false;
    });
  }

  cycleModal() {
    this.opened = true;
  }
}
