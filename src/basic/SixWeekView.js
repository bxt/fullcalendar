
fcViews.sixWeek = sixWeek;

function sixWeek(element, calendar) {
	var t = this;
	
	
	// exports
	t.render = render;
	
	
	// imports
	BasicView.call(t, element, calendar, 'sixWeek');
	var opt = t.opt;
	var renderBasic = t.renderBasic;
	var formatDate = calendar.formatDate;
	
	
	
	function render(date, delta) {
	if (delta) {
			addDays(date, delta*7*6);
		}
		
		// we caluclate from a reference date when our six-week-periaod starts
		var refDate=opt('referenceDate');
		var refDate_weekstart = rewindToDOW(cloneDate(refDate),opt('firstDay'));
		var periodNo=Math.floor((date - refDate_weekstart) / (DAY_MS * 7*6)); // count of 6-week-periods between
		var start_noweekstart=addDays(refDate_weekstart,periodNo*7*6)
		
		var start = rewindToDOW(cloneDate(start_noweekstart), opt('firstDay'));
		var end = addDays(cloneDate(start), 7*6);
		var visStart = cloneDate(start);
		var visEnd = cloneDate(end);
		var weekends = opt('weekends');
		if (!weekends) {
			skipWeekend(visStart);
			skipWeekend(visEnd, -1, true);
		}
		t.title = formatDates(visStart,addDays(cloneDate(visEnd), -1),opt('titleFormat'));
		t.start = start;
		t.end = end;
		t.visStart = visStart;
		t.visEnd = visEnd;
		renderBasic(6, 6, weekends ? 7 : 5, true);
	}
	
}
