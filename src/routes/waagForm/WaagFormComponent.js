// Inspired by https://gist.github.com/insin/8418675
import React from 'react';

export default React.createClass({
  getDefaultProps: function() {
    return {
      email: true
    , question: false
    }
  }

, getInitialState: function() {
    return {errors: {}}
  }

, isValid: function() {
    var fields = ['firstName', 'lastName', 'phoneNumber', 'address', 'city', 'state', 'zipCode']
    if (this.props.email) fields.push('email')
    if (this.props.question) fields.push('question')

    var errors = {}
    fields.forEach(function(field) {
      var value = trim(this.refs[field].getDOMNode().value)
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))
    this.setState({errors: errors})

    var isValid = true
    for (var error in errors) {
      isValid = false
      break
    }
    return isValid
  }

, getFormData: function() {
    var data = {
      firstName: this.refs.firstName.getDOMNode().value
    , lastName: this.refs.lastName.getDOMNode().value
    , phoneNumber: this.refs.phoneNumber.getDOMNode().value
    , address: this.refs.address.getDOMNode().value
    , city: this.refs.city.getDOMNode().value
    , state: this.refs.state.getDOMNode().value
    , zipCode: this.refs.zipCode.getDOMNode().value
    , currentCustomer: this.refs.currentCustomerYes.getDOMNode().checked
    }
    if (this.props.email) data.email = this.refs.email.getDOMNode().value
    if (this.props.question) data.question = this.refs.question.getDOMNode().value
    return data
  }

, render: function() {
    return <form>
            <div class="form-group row">
              <label for="example-text-input" class="col-xs-2 col-form-label">Text</label>
              <div class="col-xs-10">
                <input class="form-control" type="text" value="Artisanal kale" id="example-text-input" />
              </div>
            </div>
            <div class="form-group row">
              <label for="example-search-input" class="col-xs-2 col-form-label">Search</label>
              <div class="col-xs-10">
                <input class="form-control" type="search" value="How do I shoot web" id="example-search-input" />
              </div>
            </div>
           </form>;

    // return <div className="form-horizontal">
    //   {this.renderTextInput('name', 'Name')}
    //   {this.renderTextInput('week', 'Week')}
    //   <div className="form-inline">
    //     {this.renderTextInput('item', 'Item')}
    //     {this.renderTextInput('hours', 'Hours')}
    //     {this.renderTextInput('client', 'client')}
    //     {this.renderRadioInlines('billable', 'Billable?', {
    //     values: ['Yes', 'No']
    //   , defaultCheckedValue: 'No'})}
    //   </div>
    //   {this.renderTextInput('totalHours', 'Total Hours')}
    // </div>
  }

, renderTextInput: function(id, label) {
    return this.renderField(id, label,
      <input type="text" className="form-control" id={id} ref={id}/>
    )
  }

, renderTextarea: function(id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id}/>
    )
  }

, renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id, label,
      <select className="form-control" id={id} ref={id}>
        {options}
      </select>
    )
  }

, renderRadioInlines: function(id, label, kwargs) {
    var radios = kwargs.values.map(function(value) {
      var defaultChecked = (value == kwargs.defaultCheckedValue)
      return <label className="radio-inline">
        <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
        {value}
      </label>
    })
    return this.renderField(id, label, radios)
  }

, renderField: function(id, label, field) {
    return <div className={$c('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
  }
})

function $c(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}
