class ZenforceController < ApplicationController



  def zenpath

  end


  def leaderboard
    ranking = Gioco::Ranking.generate
    user_ranking = nil
    if(params[:external_id])
      user = User.find_by_external_id(params[:external_id])
      user_ranking = {user: user}
      ranking.each_with_index do |item, index|
        if user.external_id == item.external_id
          user_ranking[:ranking] = index + 1
          break
        end
      end
    end

    response = { leaderboard: ranking }
    response[:user_ranking] = user_ranking if params[:external_id]

    respond_to do |format|

      format.json { render json: response, status: 200 }
    end
  end

  private


    # Never trust parameters from the scary internet, only allow the white list through.
    def zenforce_params
      params[:zencontroller]
    end
end
