class MinimaxPlayerT extends Agent {
    
    constructor() {
      super();
      this.board = new Board();
    }

    compute(board) {
      var move = this.take_corner(board);
      if (move) {return move;}
      const { evaluation, mov } = this.alpha_beta(board, 4, true, -69, (board.length * board.length));
      return mov;
    }

    alpha_beta(board, depth, max, alpha, beta) {

        if (depth == 0) {
          return { evaluation: this.point_counter(board), mov: [0, 0] };
        }
  
        var node = [0, 0];
        
        if (max) {
          var moves = this.board.valid_moves(board, this.color);
          if (moves.length == 0) {
            return { evaluation: this.point_counter(board), mov: [0, 0] };
          }
  
          for (var i = 0; i < moves.length; i++) {
            var element = moves[i]
            var temp_board = this.board.clone(board);
            this.board.move(temp_board, element[0], element[1], this.color);
  
            const { evaluation, mov } = this.alpha_beta(  
              temp_board,
              depth - 1,
              false,
              alpha,
              beta
            );
  
            if (evaluation > alpha) {
              alpha = evaluation;
              node = element;
              if (alpha >= beta) {
                break
              }
            }
          }
          return { evaluation: alpha, mov: node };
        } else {
          var moves = this.board.valid_moves(board, this.rival_color());
          if (moves.length == 0) {
            return this.eval_minimax(board, depth - 1, true);
          }
  
          for (var i = 0; i < moves.length; i++) {
            var element = moves[i]
            var temp_board = this.board.clone(board);
            this.board.move(
              temp_board,
              element[0],
              element[1],
              this.rival_color()
            );
            const { evaluation, mov } = this.alpha_beta(
              temp_board,
              depth - 1,
              true,
              alpha,
              beta
            );
  
            if (evaluation < beta) {
              beta = evaluation;
              node = element;
              if (alpha >= beta) {
                break
              }
            }
          }
          return { evaluation: beta, mov: node };
        }
    }  

    eval_minimax(board, depth, max) {
        if (depth == 0) {
          return { evaluation: this.point_counter(board), mov: [0, 0] };
        }
  
        var node = [0, 0];
  
        if (max) {
          var max_eval = -1;
          var moves = this.board.valid_moves(board, this.color);
  
          if (moves.length == 0) {
            return { evaluation: this.point_counter(board), mov: [0, 0] };
          }
  
          moves.forEach((element) => {
            var temp_board = this.board.clone(board);
            this.board.move(temp_board, element[0], element[1], this.color);
            const { evaluation, mov } = this.eval_minimax(
              temp_board,
              depth - 1,
              false
            );
  
            if (evaluation > max_eval) {
              max_eval = evaluation;
              node = element;
            }
          });
          return { evaluation: max_eval, mov: node };
        } else {
          var min_eval = 65;
          var moves = this.board.valid_moves(board, this.rival_color());
          if (moves.length == 0) {
            return this.eval_minimax(board, depth - 1, true);
          }
          moves.forEach((element) => {
            var temp_board = this.board.clone(board);
            this.board.move(
              temp_board,
              element[0],
              element[1],
              this.rival_color()
            );
            const { evaluation, mov } = this.eval_minimax(
              temp_board,
              depth - 1,
              true
            );
  
            if (evaluation < min_eval) {
              min_eval = evaluation;
              node = element;
            }
          });
          return { evaluation: min_eval, mov: node };
        }
    }

    point_counter(board) {
        var result = 0;
        var size = board.length;
        for (var i = 0; i < size; i++) {
          for (var j = 0; j < size; j++) {
            if (this.color == "W") {
              if (board[i][j] == "W") result++;
            } else {
              if (board[i][j] == "B") result++;
            }
          }
        }
        return result;
    }

    rival_color() {
      if (this.color == "W") {
        return "B";
      }
      return "W";
    }

    take_corner(board) {
      var moves = this.board.valid_moves(board, this.color);
      for (var i = 0; i < moves.length; i++) {
        if (moves[i] == [0,0] || 
            moves[i] == [0, board.length - 1] || 
            moves[i] == [board.length - 1, 0] || 
            moves[i] == [board.length - 1, board.length - 1] ){
          return moves[i];
        }
      }
    }
  }