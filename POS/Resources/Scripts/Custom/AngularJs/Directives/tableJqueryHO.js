rootHOModule.directive('tableJquery', function ($timeout) {
	return {
		restrict: 'A',
		link: function () {
			$timeout(function () {
				$("#dataTableId").DataTable({
					"responsive": true, "lengthChange": false, "autoWidth": false, "ordering": true,
					pageLength: 5,
					"dom": "lrtip",
					pagingType: "full_numbers"
				});
			});
		}
	}
});