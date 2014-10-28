class ZenforceController < ApplicationController


  def zenpath

  end


  def leaderboard

  end

  private


    # Never trust parameters from the scary internet, only allow the white list through.
    def zenforce_params
      params[:zencontroller]
    end
end
