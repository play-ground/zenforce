class UsersController < ApplicationController

  before_action :set_user, only:[:details, :points, :allocate_points]

  # POST /users
  # POST /users.json
  def create
    @user = User.find_by_external_id(user_params[:external_id])

    if @user.nil?
      @user = User.new(user_params)
      respond_to do |format|
        if @user.save
          format.json { render json: {user: @user}, status: 200 }
        else
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.json { render json: {user: @user}, status: 200 }
      end
    end

  end

  def details
    respond_to do |format|
      format.html
      format.json { render json: {user: @user, badges: @user.badges, rank: @user.rank}, status: 200}
    end
  end

  def points
    respond_to do |format|
        format.html
        format.json { render json: {user: @user, badges: @user.badges}, status: 200}
    end
  end

  def allocate_points
    badges = @user.change_points(params[:points].to_i)
    respond_to do |format|
      format.json { render json: {user: @user,  badges: badges}, status: 200}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find_by_external_id(params[:id])
      @user = User.create!(name: params[:name], email: params[:email], external_id: params[:external_id]) unless @user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :external_id)
    end
end
