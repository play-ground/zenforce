class UsersController < ApplicationController

  before_action :set_user, only:[:details, :points, :allocate_points]\

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html
        format.json { render :show, status: :created, location: @user }
      else
        format.html
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def details

  end

  def points
    respond_to do |format|
        format.html
        format.json { render json: {user: @user, points: @user.total_points}, status: 200}
    end
  end

  def allocate_points
    badges = @user.change_points({points: params[:points]})
    respond_to do |format|
      format.json { render json: {user: @user, points: @user.total_points, badges: badges}, status: 200}
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :username, :email)
    end
end
