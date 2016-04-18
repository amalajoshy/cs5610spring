/**
 * Created by amala on 28/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, $location, AdminService, $rootScope) {
        $scope.$location = $location;
        $scope.sortColumn = 0;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.saveSortColumn = saveSortColumn;

        var initTable = function() {
            $scope.table = $('#admin-table').dataTable({
                ordering: true,
                searching: false,
                paging: false,
                cache: false,
                fixedHeader: {
                    header: true
                },
                aoColumnDefs: [
                    { bSortable: false, aTargets: [1, 4, 5] }
                ]
            });
        };

        $scope.$on('LastRepeaterElement', function() {
            setTimeout(initTable, 10);
        });

        AdminService.findAllUsers()
            .then(function (response) {
                $scope.users = response.data;
            }, function(err) {
                if (err.status == 403) {
                    $location.url("/");
                }
            });

        function addUser(user) {
            AdminService.createUser(user)
                .then(function (response) {
                    $scope.users.push(response.data);
                });
        }

        function updateUser (userId, user) {
            AdminService.updateUser(userId, user)
                .then(function (response) {
                    var updatedUser = response.data;
                    $scope.users[$scope.selectedUserIndex] = updatedUser;
                });
        }

        function deleteUser(userId) {
            AdminService.deleteUserById(userId)
                .then(function (response) {
                    $scope.users = response.data;
                });
        }

        function selectUser(user, index) {
            $scope.selectedUserIndex = index;
            $scope.user = $.extend(true, {}, user);
            $scope.user._id = $scope.users[index]._id;
            $scope.user.username = $scope.users[index].username;
            $scope.user.password = $scope.users[index].password;
            $scope.user.firstName = $scope.users[index].firstName;
            $scope.user.lastName = $scope.users[index].lastName;
            $scope.user.roles = $scope.users[index].roles;
        }

        function saveSortColumn(col) {
            $scope.sortColumn = col;
        }
    }
}());