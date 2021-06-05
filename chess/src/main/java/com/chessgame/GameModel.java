package com.chessgame;
import java.util.*;

import net.minidev.json.*;

public class GameModel {
    String gameid;
    String pla1;
    String pla2;
    JSONArray board;
    String status;
    String gametype;
    String currentplayer;

    public String getpla1(){
        return this.pla1;
    }

    public String getpla2(){
        return this.pla2;
    }
    
    public String getstatus(){
        return this.status;
    }
    
    public String getgametype(){
        return this.gametype;
    }

    public String getgameid(){
        return this.gameid;
    }

    public JSONArray getboard(){
        return this.board;
    }

    public String getCurrentplayer() {
        return this.currentplayer;
    }

    public void setBoard(JSONArray board) {
        this.board = board;
    }

    public void setCurrentplayer(String currentplayer) {
        this.currentplayer = currentplayer;
    }

    public void GameValueMapper(Map<String,Object> values){
        this.gameid=(String) values.get("gameid");
        this.pla1=(String) values.get("pla1");
        this.pla2=(String) values.get("pla2");
        this.status=(String) values.get("status");
        this.gametype=(String) values.get("gametype");
        this.currentplayer=(String) values.get("currentpla");
        JSONArray jsonArray = new JSONArray();
        jsonArray.add(values.get("board"));
        this.board=jsonArray;
    }
}
