package com.chessgame;

import net.minidev.json.JSONArray;

public class GameSaveModel {
    String gameid;
    JSONArray board;
    int movecount;
    String currentPlayer;
    public void setBoard(JSONArray board) {
        this.board = board;
    }
    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }
    public void setGameid(String gameid) {
        this.gameid = gameid;
    }
    public void setMovecount(int movecount) {
        this.movecount = movecount;
    }
    public JSONArray getBoard() {
        return this.board;
    }
    public String getCurrentPlayer() {
        return currentPlayer;
    }
    public String getGameid() {
        return gameid;
    }
    public int getMovecount() {
        return movecount;
    }
}
