# ==========================================================================
# Project:   Sqwerl
# Copyright: @2011-@2017 Sqwerl Technologies, LLC
# ==========================================================================

config :all, :required => :sproutcore, :theme => 'sproutcore/ace'
proxy '/', :secure => false, :to => 'localhost:6719'
