package com.chessgame.chess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.jdbc.core.JdbcTemplate;
import java.util.*;

import com.chessgame.CoinsBuild;
import com.chessgame.GameModel;
import com.chessgame.GameSaveModel;


@RestController
@CrossOrigin
public class ApiController {
    int gameStore=4;
    Map <String, GameSaveModel> gameDetails=new HashMap<>();


    @Autowired
    JdbcTemplate jdbcTemplate;

    public Boolean updateDB(GameSaveModel game){
        String boardData=game.getBoard().toJSONString();
        String sql="UPDATE game SET board= ?, currentpla= ? WHERE gameid= ?";
        int result= jdbcTemplate.update(sql, boardData,game.getCurrentPlayer(),game.getGameid());
        if(result>0){
            return true;
        }
        return false;
    }

    @PostMapping("/newgame")
    public Map<String, String> newgame(@RequestBody GameModel game){
        Map<String,String> res=new HashMap<>();
        String gameid = UUID.randomUUID().toString();
        gameid=gameid.replaceAll("-", "");
        CoinsBuild board=new CoinsBuild();
        String boardData=board.boardData().toJSONString();
        String sql = "INSERT INTO game (gameid, pla1, pla2, gametype, currentpla, board) VALUES (?, ?, ?, ?, ?, ?)";
        int result = jdbcTemplate.update(sql, gameid, game.getpla1(), game.getpla2(), game.getgametype(), "Pla1", boardData);
        if (result > 0) {
            res.put("status","Sucess");
            res.put("gameid", gameid);
            return res;
        }
        res.put("Status", "Internal Server Error");
        return res;
    }

    @PostMapping("/updategame")
    public Map<String,String> updategame(@RequestBody GameSaveModel game){
        Map<String,String> result=new HashMap<>();
        try{
            if(gameDetails.containsKey(game.getGameid())){
                GameSaveModel currentgame = gameDetails.get(game.getGameid());
                currentgame.setCurrentPlayer(game.getCurrentPlayer());
                currentgame.setBoard(game.getBoard());
                if(currentgame.getMovecount()>=gameStore){
                    if(updateDB(game)){
                        currentgame.setMovecount(0);
                    }
                    else{
                        System.out.println("Not Inserted in DB");
                    }
                }
                else{
                    int count=currentgame.getMovecount();
                    currentgame.setMovecount(count+1);
                }
            }
            else{
                gameDetails.put(game.getGameid(), game);
            }
            result.put("Status", "Updated");
        }
        catch(Exception e){
            result.put("Status", "Internal Server Error");
        }
        return result;
    }

    @GetMapping("/users")
    public Map<String, Object> user(@RequestParam(required = false) int id){
        String sql = "SELECT * FROM users where id=?";
        return jdbcTemplate.queryForMap(sql,id);
    }

    @GetMapping("/loadgame")
    public GameModel loadgame(@RequestParam(required = true) String gameid){
        try{
            String sql = "SELECT * FROM game where gameid=?";
            Map<String,Object> sqlresult= jdbcTemplate.queryForMap(sql,gameid);
            GameModel result=new GameModel();
            result.GameValueMapper(sqlresult);
            if(gameDetails.containsKey(gameid)){
                GameSaveModel savedgame= gameDetails.get(gameid);
                result.setBoard(savedgame.getBoard());
                result.setCurrentplayer(savedgame.getCurrentPlayer());
            }
            return result;
        }catch(Exception e){
            System.out.println("Error:"+e);
        }
        return new GameModel();
    }
}
