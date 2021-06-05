package com.chessgame;

import java.util.*;
import net.minidev.json.JSONArray;

public class CoinsBuild {
    JSONArray board=new JSONArray();
    
    public CoinsBuild(){
        JSONArray col1=new JSONArray();
        col1.addAll(Arrays.asList("♜","♞","♝","♛","♚","♝","♞","♜"));
        board.add(col1);
        JSONArray col2=new JSONArray();
        col2.addAll(Arrays.asList("♟","♟","♟","♟","♟","♟","♟","♟"));
        board.add(col2);
        for(int i=0;i<4;i++){
            JSONArray un=new JSONArray();
            for(int j=0;j<8;j++){
                un.add("0");
            }
            board.add(un);
        }
        JSONArray col3=new JSONArray();
        col3.addAll(Arrays.asList("♙","♙","♙","♙","♙","♙","♙","♙"));
        board.add(col3);
        JSONArray col4=new JSONArray();
        col4.addAll(Arrays.asList("♖","♘","♗","♕","♔","♗","♘","♖"));
        board.add(col4);
    }

    public JSONArray boardData(){
        return this.board;
    }
}
