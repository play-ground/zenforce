require 'test_helper'

class ZencontrollersControllerTest < ActionController::TestCase
  setup do
    @zencontroller = zencontrollers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:zenforce)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create zencontroller" do
    assert_difference('Zencontroller.count') do
      post :create, zencontroller: {  }
    end

    assert_redirected_to zencontroller_path(assigns(:zencontroller))
  end

  test "should show zencontroller" do
    get :show, id: @zencontroller
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @zencontroller
    assert_response :success
  end

  test "should update zencontroller" do
    patch :update, id: @zencontroller, zencontroller: {  }
    assert_redirected_to zencontroller_path(assigns(:zencontroller))
  end

  test "should destroy zencontroller" do
    assert_difference('Zencontroller.count', -1) do
      delete :destroy, id: @zencontroller
    end

    assert_redirected_to zencontrollers_path
  end
end
